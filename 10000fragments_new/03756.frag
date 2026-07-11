uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 37.90 - t * 1.39 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 8.41 - t * 3.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.16, vec3(0.60, 0.59, 0.42), vec3(0.33, 0.35, 0.41), vec3(0.85, 1.13, 0.77), vec3(0.87, 0.89, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
