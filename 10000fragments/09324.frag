uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.45 * jf)) * 0.64;
        xs += sin(length(p - im) * 127.27 - t * 9.70 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	p = rot2(time * 0.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.27, vec3(0.50, 0.57, 0.41), vec3(0.34, 0.43, 0.38), vec3(1.27, 0.99, 1.10), vec3(0.77, 0.70, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
