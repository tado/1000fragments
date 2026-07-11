uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 22.26 - t * 4.71 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 16.07 - t * 4.71 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p *= 2.50;
	p = rot2(2.87) * p;
	p = fract(p * 2.22) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.14, vec3(0.48, 0.42, 0.54), vec3(0.45, 0.50, 0.37), vec3(1.14, 0.87, 1.37), vec3(0.01, 0.32, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
