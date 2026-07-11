uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.63;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.38 - t * 2.28 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.54 / 3.1415927, 0.63 / r - time * 2.08);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.25, vec3(0.53, 0.50, 0.57), vec3(0.48, 0.48, 0.37), vec3(0.88, 0.97, 1.07), vec3(0.21, 0.49, 0.83));
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
