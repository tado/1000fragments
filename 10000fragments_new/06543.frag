uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.68 + vec2(t * 0.38, -t * 0.88) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.50 / 3.1415927, 0.54 / r - time * 1.94);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.24, vec3(0.42, 0.41, 0.45), vec3(0.48, 0.34, 0.37), vec3(0.98, 0.79, 1.16), vec3(0.63, 0.24, 0.59));
	col *= clamp(r * 2.04, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
