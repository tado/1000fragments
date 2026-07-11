uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.64 + vec2(t * 2.41, -t * 1.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.53) * 1.48), cos((time * 0.53) * 1.14)) * 0.09;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.81 / 3.1415927, 0.63 / r - (time * 0.53) * 2.10);
	float d = field(tv, (time * 0.53), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.53, 0.43, 0.46) + vec3(0.04, 0.05, 0.07);
	col *= clamp(r * 1.46, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 0.987, 0.984) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
