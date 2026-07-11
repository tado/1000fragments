uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.85 + sin(p.y * 4.98 + t * 2.94) * 2.48 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.25;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.00 - t * 5.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 4.12 - time * 0.26); }
	p += vec2(-0.02, -0.57) * sin(length(p) * 2.21 - time * 1.10) * 0.30;
	p *= 2.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.68 + time * 0.10, vec3(0.50, 0.41, 0.49), vec3(0.38, 0.32, 0.30), vec3(0.80, 0.70, 0.96), vec3(0.63, 0.95, 0.52));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.34 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
