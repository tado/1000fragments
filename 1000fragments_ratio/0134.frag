uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 19.38 - t * 5.38 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 19.94 - t * 4.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	p *= 2.06;
	p = sin(p * 2.32 + (time * 0.72) * 0.88) * 1.11;
	p += vec2(-0.34, 0.87) * sin(length(p) * 5.47 - (time * 0.72) * 1.75) * 0.11;
	p = abs(p);
	float d = field(p, (time * 0.72), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 0.63, 0.67) + vec3(0.01, 0.06, 0.05);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.970, 1.029) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
