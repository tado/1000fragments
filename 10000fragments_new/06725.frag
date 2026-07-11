uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.69 + 0.11 * cos(sa * 3.0 + t * 1.58 + ph);
    v = sin((sr - petal) * 14.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.59 / 3.1415927, 0.75 / r + time * 2.18);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.53, 0.28, 0.69) * (0.21 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 1.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
