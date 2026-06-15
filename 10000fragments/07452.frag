uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 18.78 - t * 5.08 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 33.85 - t * 5.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	p = rot2(length(p) * 1.13 + time * 0.73) * p;
	p = rot2(p.y * -3.53 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.05, vec3(0.50, 0.57, 0.58), vec3(0.47, 0.48, 0.42), vec3(0.80, 1.08, 1.39), vec3(0.62, 0.31, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
