uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 19.94 - t * 1.95 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 30.17 - t * 1.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.19, vec3(0.48, 0.42, 0.57), vec3(0.37, 0.42, 0.36), vec3(1.22, 0.89, 1.12), vec3(0.41, 0.31, 0.80));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
