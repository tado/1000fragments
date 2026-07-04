uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.48;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 21.61 - t * 2.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.43 / 3.1415927, 0.73 / r - time * 0.92);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.31, vec3(0.56, 0.45, 0.43), vec3(0.35, 0.36, 0.40), vec3(0.78, 0.94, 0.87), vec3(0.16, 0.18, 0.96));
	col *= clamp(r * 2.38, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
