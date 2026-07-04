uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.59;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.33 - t * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.90), cos(time * 0.82)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.65;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.16 / 3.1415927, 0.62 / r - time * 2.34);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.06, vec3(0.44, 0.59, 0.40), vec3(0.31, 0.50, 0.34), vec3(1.17, 0.74, 0.85), vec3(0.67, 0.84, 0.25));
	col *= clamp(r * 2.70, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
