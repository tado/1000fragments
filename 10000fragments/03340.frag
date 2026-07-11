uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.34) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 1.20 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	p = fract(p * 1.09) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.35, length(p) * 4.27 - time * 0.45); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.80 + time * 0.08);
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
