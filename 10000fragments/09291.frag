uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.20 * jf)) * 0.56;
        xs += sin(length(p - im) * 159.90 - t * 8.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.24; p = rot2(2.47) * p; }
	p = rot2(time * 0.46) * p;
	p = fract(p * 1.26) - 0.5;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 1.53 * p.y + time * 0.81); p.y += 0.22 / wf * cos(wf * 2.09 * p.x + time * 1.87); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.53 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
