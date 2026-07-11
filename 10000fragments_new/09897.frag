uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.28 * cos(sa * 4.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 11.79);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.36;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.86 / 3.1415927, 1.30 / r - time * 0.94);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.32, 0.51), vec3(0.97, 0.86, 0.54), cc);
	col *= clamp(r * 2.14, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
