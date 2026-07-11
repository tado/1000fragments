uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.39 + jf * 4.0), cos(t * 0.19 * jf)) * 0.68;
        xs += sin(length(p - im) * 211.03 - t * 8.97 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.76 + time * 1.18) * p;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.02, 0.46), vec3(0.66, 0.86, 0.53), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
