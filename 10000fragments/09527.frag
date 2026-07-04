uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.53;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 13.70 - t * 4.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 1.27)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.12 / 3.1415927, 0.67 / r - time * 1.13);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.24, 0.38, 0.49) * (0.15 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
