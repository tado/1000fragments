uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.52;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.47 - t * 5.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.21 / 3.1415927, 1.21 / r - time * 2.47);
	tv.x += tv.y * 0.47;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.75 + time * 0.62);
	col *= clamp(r * 1.95, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
