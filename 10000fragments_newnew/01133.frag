uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.11 * cos(sa * 9.0 + t * 2.11 + ph);
    v = sin((sr - petal) * 8.41);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.60;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.71 / 3.1415927, 1.42 / r - time * 2.70);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.42, 0.84, 0.50) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.35, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
