uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.59) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	p = fract(p * 2.41) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 2.64 - time * 0.53); }
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.98 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
