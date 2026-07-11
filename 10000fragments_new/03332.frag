uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.52 * jf)) * 0.61;
        xs += sin(length(p - im) * 203.25 - t * 4.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.44 + 0.33 * pow(abs(cos(ra * 6.0 + t * 1.37)), 0.95);
    v = sin((rr - pet) * 10.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 6.07 + time * 1.07) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.08);
	float d = d1 + d2;
	vec3 col = palette(d * 0.52 + time * 0.07, vec3(0.48, 0.54, 0.55), vec3(0.37, 0.35, 0.33), vec3(1.11, 0.78, 1.28), vec3(0.59, 0.47, 0.02));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
