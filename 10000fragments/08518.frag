uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.62 - t * 1.05;
    v = sin(floor(lv * 3.5) / 3.5 * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.57;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 13.18 - t * 2.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.08, vec3(0.50, 0.46, 0.44), vec3(0.48, 0.46, 0.34), vec3(0.98, 1.12, 1.13), vec3(0.39, 0.75, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
