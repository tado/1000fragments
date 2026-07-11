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
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.38 * jf)) * 0.45;
        xs += sin(length(p - im) * 208.58 - t * 6.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.27, vec3(0.49, 0.48, 0.56), vec3(0.45, 0.49, 0.49), vec3(1.03, 0.79, 1.27), vec3(0.40, 0.32, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
