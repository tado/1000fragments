uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.32 + 0.25 * cos(sa * 4.0 + t * 2.15 + ph);
    v = sin((sr - petal) * 16.37);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.30), cos(time * 0.87)) * 0.17;
	float an = atan(p.y, p.x) + time * -0.33;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.67 / 3.1415927, 0.56 / r - time * 2.73);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.15, 0.46, 0.56) * (0.14 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 1.81, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
