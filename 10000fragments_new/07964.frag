uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.23 + vec2(t * 2.85, -t * 1.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.40 / 3.1415927, 0.66 / r - time * 1.60);
	tv.x += tv.y * 0.41;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.58, 0.77, 0.94) + vec3(0.05, 0.12, 0.15);
	col *= clamp(r * 1.74, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
