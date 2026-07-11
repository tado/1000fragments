uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.11 * cos(sa * 7.0 + t * 1.41 + ph);
    v = sin((sr - petal) * 19.85);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.76), cos(time * 0.91)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.10 / 3.1415927, 0.54 / r + time * 2.84);
	tv.x += tv.y * 0.30;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.58, 0.28, 0.76) * (0.05 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.06, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
