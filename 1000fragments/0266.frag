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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.55 * jf)) * 0.41;
        xs += sin(length(p - im) * 84.79 - t * 5.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p *= 2.70;
	p = rot2(1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.01, vec3(0.45, 0.41, 0.51), vec3(0.34, 0.44, 0.35), vec3(0.75, 1.02, 0.90), vec3(0.68, 0.09, 0.61));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
