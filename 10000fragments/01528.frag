uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 9.52 - t * 7.01 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 20.32 - t * 7.01 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.19, vec3(0.44, 0.60, 0.45), vec3(0.34, 0.39, 0.49), vec3(0.80, 1.18, 1.28), vec3(0.63, 0.49, 0.21));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
