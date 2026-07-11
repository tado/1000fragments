uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.19;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.78 - t * 4.89 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.26 / 3.1415927, 0.32 / r - (time * 0.52) * 1.90);
	float d = field(tv, (time * 0.52), 0.0);
	vec3 col = vec3(0.42, 0.53, 0.35) * (0.08 / (abs((d)) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.30, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.73));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.961, 1.019) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
