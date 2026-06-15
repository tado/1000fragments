uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 22.06 - t * 4.65 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 38.07 - t * 4.65 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.28, vec3(0.43, 0.59, 0.60), vec3(0.40, 0.43, 0.45), vec3(1.16, 1.03, 0.90), vec3(0.02, 0.89, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
