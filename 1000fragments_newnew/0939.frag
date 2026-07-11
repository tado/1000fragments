uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 38.75 - t * 1.54 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 35.43 - t * 6.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.72) * -0.32;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.15 / 3.1415927, 1.13 / r - (time * 0.72) * 1.40);
	float d = field(tv, (time * 0.72), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.82, 0.70, 0.63), vec3(0.11, 0.01, 0.09), cc);
	col *= clamp(r * 1.66, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.999, 0.941) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
