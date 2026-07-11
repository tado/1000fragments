uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.37;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 15.72 - t * 5.62 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.46;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 9.04 - t * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	p *= 1.0 + 0.40 * sin(time * 1.71);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.13, vec3(0.56, 0.59, 0.49), vec3(0.49, 0.32, 0.38), vec3(0.82, 1.15, 1.25), vec3(0.22, 0.85, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
