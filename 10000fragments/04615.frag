uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 30.58 - t * 3.93 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 30.03 - t * 3.93 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.20, vec3(0.57, 0.51, 0.47), vec3(0.31, 0.35, 0.50), vec3(1.26, 1.40, 0.98), vec3(0.82, 0.74, 0.98));
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
