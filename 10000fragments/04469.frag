uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 8.51 - t * 2.55 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 22.86 - t * 2.55 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.18, vec3(0.52, 0.42, 0.45), vec3(0.40, 0.42, 0.37), vec3(1.38, 1.27, 1.00), vec3(0.24, 0.86, 0.51));
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
