uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.60 + sr * 23.80 - t * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.91 / 3.1415927, 1.14 / r + time * 1.32);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 1.32, 0.73) + vec3(0.06, 0.06, 0.04);
	col *= clamp(r * 2.28, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
