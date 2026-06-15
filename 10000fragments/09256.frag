uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.41 + t * 2.13 + ph) + sin(p.y * 11.02 - t * 5.92 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.38 * jf)) * 0.61;
        xs += sin(length(p - im) * 94.41 - t * 11.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	p = rot2(2.28) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.05 + time * 0.22, vec3(0.42, 0.47, 0.53), vec3(0.49, 0.40, 0.37), vec3(1.11, 0.71, 0.76), vec3(0.72, 0.44, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
