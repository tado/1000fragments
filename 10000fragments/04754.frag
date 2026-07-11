uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.20, 0.0)) * 33.86 - t * 6.03 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 30.69 - t * 6.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.15;
	p += vec2(0.40, 0.35) * sin(length(p) * 4.69 - time * 1.63) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.18, vec3(0.58, 0.59, 0.55), vec3(0.38, 0.48, 0.37), vec3(1.24, 1.33, 1.08), vec3(0.84, 0.70, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
