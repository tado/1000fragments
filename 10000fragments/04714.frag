uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.07) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 1.87 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.70, 0.43) * sin(length(p) * 5.38 - time * 0.51) * 0.24;
	p = fract(p * 2.34) - 0.5;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.29 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
