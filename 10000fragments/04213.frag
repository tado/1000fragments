uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 37.60 - t * 3.23 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 16.09 - t * 2.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	p = (floor(p * 14.9) + 0.5) / 14.9;
	p = rot2(length(p) * 2.36 + time * 0.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.25, vec3(0.56, 0.54, 0.59), vec3(0.50, 0.35, 0.45), vec3(1.36, 0.75, 0.87), vec3(0.63, 0.66, 0.96));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
