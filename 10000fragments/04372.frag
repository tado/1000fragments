uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 12.94 - t * 7.65 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 29.65 - t * 7.65 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.19, vec3(0.55, 0.48, 0.42), vec3(0.35, 0.49, 0.48), vec3(0.80, 1.25, 0.87), vec3(0.67, 0.88, 0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
