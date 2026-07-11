uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.21 * cos(sa * 8.0 + t * 0.54 + ph);
    v = sin((sr - petal) * 14.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.49 / 3.1415927, 1.10 / r - time * 1.68);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.52 + time * 0.68);
	col *= clamp(r * 2.25, 0.0, 1.0);
	col = fract(col * 1.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
