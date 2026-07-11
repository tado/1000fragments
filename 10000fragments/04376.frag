uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 23.53 - t * 4.62 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 30.48 - t * 4.62 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.80;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.03, vec3(0.51, 0.54, 0.50), vec3(0.39, 0.37, 0.42), vec3(1.18, 1.40, 1.06), vec3(0.59, 0.95, 0.40));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
