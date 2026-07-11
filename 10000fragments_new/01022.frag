uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 20.92 - t * 4.89 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 29.65 - t * 3.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.29, vec3(0.51, 0.53, 0.47), vec3(0.47, 0.34, 0.38), vec3(0.93, 0.71, 1.13), vec3(0.06, 1.00, 0.29));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
