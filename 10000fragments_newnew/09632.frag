uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.38 + vec2(t * 2.01, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.27;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.09 / 3.1415927, 0.47 / r - time * 1.05);
	tv.x += tv.y * 0.23;
	float d = field(tv, time, 0.0);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.20, 0.19, 0.22), vec3(0.57, 0.92, 0.68), cc);
	col *= clamp(r * 2.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
