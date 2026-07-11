uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 24.47 - t * 5.07 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 29.91 - t * 5.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.15, vec3(0.40, 0.59, 0.52), vec3(0.44, 0.40, 0.39), vec3(1.06, 1.16, 0.79), vec3(0.83, 0.85, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
