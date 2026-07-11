uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.37);
    float gsh = hash21(vec2(grow, floor(t * 2.46))) - 0.5;
    float gx = p.x + gsh * 0.94;
    v = sin(gx * 12.86 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.77));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p = rot2(time * -0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.86 + time * 0.14, vec3(0.48, 0.40, 0.48), vec3(0.48, 0.38, 0.45), vec3(0.84, 1.06, 0.95), vec3(0.02, 0.55, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
