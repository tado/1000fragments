uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.42) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 3.49 + time * 1.88) * 0.23;
	p = fract(p * 2.93) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.65 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.73 + time * 0.17);
	col = fract(col * 2.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
