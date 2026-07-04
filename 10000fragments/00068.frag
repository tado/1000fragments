uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.12 * cos(sa * 8.0 + t * 1.29 + ph);
    v = sin((sr - petal) * 18.96);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.20 / 3.1415927, 0.81 / r + time * 2.94);
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.07, 0.26), vec3(0.77, 0.67, 0.42), cc);
	col *= clamp(r * 2.68, 0.0, 1.0);
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 2.36 + time * 7.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
