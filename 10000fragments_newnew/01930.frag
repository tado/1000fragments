uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.11;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.62 - t * 1.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.20), cos(time * 0.99)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.16 / 3.1415927, 0.32 / r + time * 1.66);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.17 + time * 0.96);
	col *= clamp(r * 2.13, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
