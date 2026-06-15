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
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.49 * jf)) * 0.37;
        xs += sin(length(p - im) * 161.91 - t * 7.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(time * -0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.19, vec3(0.54, 0.45, 0.40), vec3(0.43, 0.49, 0.39), vec3(1.15, 0.97, 1.05), vec3(0.06, 0.99, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
