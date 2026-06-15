uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 19.89 - t * 7.42 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 16.65 - t * 7.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.69, 0.48) * sin(length(p) * 3.09 - time * 1.14) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.89 + time * 0.24, vec3(0.50, 0.46, 0.46), vec3(0.46, 0.46, 0.34), vec3(0.78, 0.98, 1.09), vec3(0.13, 0.24, 0.11));
	col = mod(col * 2.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
