uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.69) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 4.12 - time * 0.72); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.14 + time * 0.26);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.65 + time * 10.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
