uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.37; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.14 - t * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	p = rot2(p.y * 1.50 + time * 0.76) * p;
	p = rot2(time * -0.61) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.28), field(p, time, 0.56));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
